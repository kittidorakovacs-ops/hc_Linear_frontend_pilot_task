import { useState, type ChangeEvent, type FormEvent } from "react";
import Modal from "../../component/ui/modal/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useCreateBusMutation } from "./bus.hooks";
import type { Bus } from "./bus.types";
import { useToast } from "../../component/ui/toast/ToastProvider";
import {
  INITIAL_BUS_FORM,
  type BusFormValues,
  type BusFormErrors,
  PLATE_PREFIX_REGEX,
  PLATE_NUMBER_REGEX,
  validateBusForm,
} from "./untils/busForm.utils";

interface BusCreateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BusCreateModal({ open, onClose }: BusCreateModalProps) {
  const { showToast } = useToast();
  const createBusMutation = useCreateBusMutation();

  const [form, setForm] = useState<BusFormValues>(INITIAL_BUS_FORM);
  const [errors, setErrors] = useState<BusFormErrors>({});

  const isPlateValid =
    PLATE_PREFIX_REGEX.test(form.platePrefix) &&
    PLATE_NUMBER_REGEX.test(form.plateNumber);

  const isModelValid = form.model.trim().length >= 2;
  const isCapacityValid = form.capacity >= 1 && form.capacity <= 200;

  const resetForm = () => {
    setForm(INITIAL_BUS_FORM);
    setErrors({});
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "platePrefix") {
      const upper = value.toUpperCase();
      setForm((prev) => ({ ...prev, platePrefix: upper }));
      setErrors((prev) => ({ ...prev, plate: undefined }));
      return;
    }

    if (name === "plateNumber") {
      const numeric = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, plateNumber: numeric }));
      setErrors((prev) => ({ ...prev, plate: undefined }));
      return;
    }

    if (name === "model") {
      setForm((prev) => ({ ...prev, model: value }));
      setErrors((prev) => ({ ...prev, model: undefined }));
      return;
    }

    if (name === "capacity") {
      const num = Number(value);
      setForm((prev) => ({ ...prev, capacity: num }));
      setErrors((prev) => ({ ...prev, capacity: undefined }));
      return;
    }

    // status, stb.
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateBusForm(form);
    setErrors(validationErrors);

    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors) {
      showToast({
        variant: "warning",
        message: "Kérlek tölts ki helyesen minden mezőt.",
      });
      return;
    }

    const fullPlate = `${form.platePrefix}-${form.plateNumber}`;

    const payload: Omit<Bus, "id"> = {
      model: form.model.trim(),
      plate: fullPlate,
      status: form.status,
      capacity: form.capacity,
    };

    createBusMutation.mutate(payload, {
      onSuccess: () => {
        showToast({
          variant: "success",
          message: "Busz sikeresen hozzáadva a listához.",
        });

        resetForm();
        onClose();
      },
      onError: () => {
        showToast({
          variant: "error",
          message: "Nem sikerült elmenteni az új buszt. Próbáld újra.",
        });
      },
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Új busz felvétele"
    >
      <form onSubmit={handleSubmit} className="modal-form">
        {/* Modell */}
        <div className="modal-row">
          <div className="modal-label">Modell</div>
          <div className="modal-field">
            <div className="modal-input-wrapper">
              <input
                className="hcl-input"
                name="model"
                value={form.model}
                onChange={handleChange}
                required
              />
              {isModelValid && !errors.model && (
                <CheckCircleOutlineIcon className="modal-valid-icon" />
              )}
              {errors.model && (
                <p className="hcl-input-error">{errors.model}</p>
              )}
            </div>
          </div>
        </div>

        {/* Rendszám */}
        <div className="modal-row">
          <div className="modal-label">Rendszám</div>
          <div className="modal-field">
            <div className="modal-input-wrapper">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  className="hcl-input"
                  style={{
                    width: 80,
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                  name="platePrefix"
                  maxLength={4}
                  value={form.platePrefix}
                  onChange={handleChange}
                  placeholder="ABC"
                  required
                />
                <span>-</span>
                <input
                  className="hcl-input"
                  style={{ width: 80, textAlign: "center" }}
                  name="plateNumber"
                  maxLength={3}
                  value={form.plateNumber}
                  onChange={handleChange}
                  placeholder="123"
                  required
                />
              </div>

              {isPlateValid && !errors.plate && (
                <CheckCircleOutlineIcon className="modal-valid-icon" />
              )}

              {errors.plate && (
                <p className="hcl-input-error" style={{ marginTop: 4 }}>
                  {errors.plate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Státusz */}
        <div className="modal-row">
          <div className="modal-label">Státusz</div>
          <div className="modal-field">
            <div className="modal-input-wrapper">
              <select
                className="hcl-select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="operational">operational</option>
                <option value="active">active</option>
                <option value="maintenance">maintenance</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kapacitás */}
        <div className="modal-row">
          <div className="modal-label">Kapacitás</div>
          <div className="modal-field">
            <div className="modal-input-wrapper">
              <input
                className="hcl-input"
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                required
                min={1}
                max={200}
              />
              {isCapacityValid && !errors.capacity && (
                <CheckCircleOutlineIcon className="modal-valid-icon" />
              )}
              {errors.capacity && (
                <p className="hcl-input-error">{errors.capacity}</p>
              )}
            </div>
          </div>
        </div>

        {/* Gombok */}
        <div
          className="modal-row"
          style={{ borderBottom: "none", paddingTop: 16 }}
        >
          <div className="modal-label" />
          <div className="modal-field" style={{ justifyContent: "flex-end" }}>
            <button
            type="submit"
            className="modal-create-btn"
            disabled={createBusMutation.isPending}
            >
            {createBusMutation.isPending ? "Mentés..." : "Busz hozzáadása"}
            </button>

          </div>
        </div>
      </form>
    </Modal>
  );
}

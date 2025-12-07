// src/page/bus/BusEdit.tsx

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  useBusQuery,
  useUpdateBusMutation,
  useDeleteBusMutation,
} from "./bus.hooks";
import type { Bus } from "./bus.types";
import * as S from "./style/busEdit.style";
import {
  INITIAL_BUS_FORM,
  type BusFormValues,
  type BusFormErrors,
  validateBusForm,
} from "./untils/busForm.utils";
import { useToast } from "../../component/ui/toast/ToastProvider";
import "./style/css/bus.classes.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export function BusEdit() {
  const { id } = useParams();
  const busId = Number(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { data, isLoading, isError } = useBusQuery(busId);
  const updateBusMutation = useUpdateBusMutation();
  const deleteBusMutation = useDeleteBusMutation();

  const [form, setForm] = useState<BusFormValues>(INITIAL_BUS_FORM);
  const [errors, setErrors] = useState<BusFormErrors>({});

  // Betöltjük az adatot a formba
  useEffect(() => {
    if (!data) return;

    const [platePrefix = "", plateNumber = ""] = data.plate.split("-");

    setForm({
      model: data.model,
      platePrefix,
      plateNumber,
      status: data.status,
      capacity: data.capacity,
    });
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "platePrefix") {
      const upper = value.toUpperCase();
      setForm((prev) => ({ ...prev, platePrefix: upper }));
      setErrors((curr) => ({ ...curr, plate: undefined }));
      return;
    }

    if (name === "plateNumber") {
      const numeric = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, plateNumber: numeric }));
      setErrors((curr) => ({ ...curr, plate: undefined }));
      return;
    }

    if (name === "model") {
      setForm((prev) => ({ ...prev, model: value }));
      setErrors((curr) => ({ ...curr, model: undefined }));
      return;
    }

    if (name === "capacity") {
      const num = Number(value);
      setForm((prev) => ({ ...prev, capacity: num }));
      setErrors((curr) => ({ ...curr, capacity: undefined }));
      return;
    }

    // status stb.
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    updateBusMutation.mutate(
      { id: busId, data: payload },
      {
        onSuccess: () => {
          showToast({
            variant: "success",
            message: "Busz adatai sikeresen frissítve.",
          });
          navigate(`/buses/${busId}`);
        },
        onError: () => {
          showToast({
            variant: "error",
            message: "Nem sikerült frissíteni a buszt. Próbáld újra.",
          });
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(`/buses/${busId}`);
  };

  const handleDelete = () => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a buszt?")) return;

    deleteBusMutation.mutate(busId, {
      onSuccess: () => {
        showToast({
          variant: "success",
          message: "Busz sikeresen törölve.",
        });
        navigate("/buses");
      },
      onError: () => {
        showToast({
          variant: "error",
          message: "Nem sikerült törölni a buszt. Próbáld újra.",
        });
      },
    });
  };

  if (isLoading) return <S.Page>Betöltés...</S.Page>;

  if (isError || !data)
    return (
      <S.Page>
        <div style={{ color: "#E5342B" }}>Nem található ilyen busz.</div>
      </S.Page>
    );

  return (
    <S.Page>
      {/* OLDAL FEJLÉC – mint BusDetail */}
      <S.Header>
        <S.Title variant="h3">Busz #{data.id} szerkesztése</S.Title>
        <S.Subtitle>
          Modell, rendszám, státusz és kapacitás módosítása.
        </S.Subtitle>
      </S.Header>

      {/* FORM KÁRTYA */}
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>Busz adatai</S.CardTitle>
          <S.CardSubtitle>
            Változtasd meg a szükséges mezőket, majd nyomd meg a mentés gombot.
          </S.CardSubtitle>
        </S.CardHeader>

    <form onSubmit={handleSubmit}>

  {/* MODELL */}
  <div className="bus-form-row">
    <div className="bus-form-label">Modell</div>
    <div className="bus-form-field">
      <div className="bus-form-input-wrapper">
        <input
          className="hcl-input"
          name="model"
          value={form.model}
          onChange={handleChange}
          required
        />

        {form.model.trim().length >= 2 && !errors.model && (
          <CheckCircleOutlineIcon className="bus-form-valid-icon" />
        )}

        {errors.model && (
          <p className="hcl-input-error">{errors.model}</p>
        )}
      </div>
    </div>
  </div>

  {/* RENDSZÁM */}
  <div className="bus-form-row">
    <div className="bus-form-label">Rendszám</div>
    <div className="bus-form-field">
      <div className="bus-form-input-wrapper">
        
        <div className="bus-plate-wrapper">
          <input
            className="hcl-input bus-plate-prefix"
            name="platePrefix"
            maxLength={4}
            value={form.platePrefix}
            onChange={handleChange}
            placeholder="ABC"
            required
          />
          <span>-</span>
          <input
            className="hcl-input bus-plate-number"
            name="plateNumber"
            maxLength={3}
            value={form.plateNumber}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </div>

        {form.platePrefix && form.plateNumber && !errors.plate && (
          <CheckCircleOutlineIcon className="bus-form-valid-icon" />
        )}

        {errors.plate && (
          <p className="hcl-input-error">{errors.plate}</p>
        )}
      </div>
    </div>
  </div>

  {/* STÁTUSZ */}
  <div className="bus-form-row">
    <div className="bus-form-label">Státusz</div>
    <div className="bus-form-field">
      <div className="bus-form-input-wrapper">
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

  {/* KAPACITÁS */}
  <div className="bus-form-row">
    <div className="bus-form-label">Kapacitás</div>
    <div className="bus-form-field">
      <div className="bus-form-input-wrapper">
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

        {form.capacity >= 1 &&
          form.capacity <= 200 &&
          !errors.capacity && (
            <CheckCircleOutlineIcon className="bus-form-valid-icon" />
          )}

        {errors.capacity && (
          <p className="hcl-input-error">{errors.capacity}</p>
        )}
      </div>
    </div>
  </div>

  
  <S.FormFooter>
    <S.LeftActions>
      <button
        type="button"
        className="hcl-back-btn"
        onClick={handleCancel}
      >
        ← <span>Mégse</span>
      </button>

      <S.DeleteButton type="button" onClick={handleDelete}>
        <DeleteOutlineIcon fontSize="small" />
        <span>Törlés</span>
      </S.DeleteButton>
    </S.LeftActions>

    <S.SaveButton type="submit" disabled={updateBusMutation.isPending}>
      <SaveIcon fontSize="small" />
      <span>
        {updateBusMutation.isPending ? "Mentés..." : "Mentés"}
      </span>
    </S.SaveButton>
  </S.FormFooter>

</form>

      </S.Card>
    </S.Page>
  );
}

export default BusEdit;

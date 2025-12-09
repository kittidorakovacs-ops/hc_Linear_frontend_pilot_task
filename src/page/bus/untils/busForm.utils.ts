export type BusFormValues = {
  model: string;
  platePrefix: string;
  plateNumber: string;
  status: string;
  capacity: number;
};

export type BusFormErrors = Partial<{
  model: string;
  plate: string;
  capacity: string;
}>;

export const INITIAL_BUS_FORM: BusFormValues = {
  model: "",
  platePrefix: "",
  plateNumber: "",
  status: "operational",
  capacity: 50,
};


export const PLATE_PREFIX_REGEX = /^[A-Z]{3,4}$/;
export const PLATE_NUMBER_REGEX = /^\d{3}$/;
export const MODEL_MAX_LENGTH = 50;

export const MODEL_ALLOWED_REGEX = /^[A-Za-z0-9\- ]+$/;

export function validateBusForm(values: BusFormValues): BusFormErrors {
  const errors: BusFormErrors = {};

  // ---- MODELL ----
const trimmedModel = values.model.trim();

if (!trimmedModel || trimmedModel.length < 2) {
  errors.model = "A modell mező legalább 2 karakter legyen.";
} else if (trimmedModel.length > MODEL_MAX_LENGTH) {
  errors.model = `A modell neve legfeljebb ${MODEL_MAX_LENGTH} karakter lehet.`;
} else if (!MODEL_ALLOWED_REGEX.test(trimmedModel)) {
  errors.model =
    "A modell neve csak betűket, számokat, szóközt és kötőjelet tartalmazhat.";
}

  // ---- RENDSZÁM ----
  const prefixOk = PLATE_PREFIX_REGEX.test(values.platePrefix);
  const numberOk = PLATE_NUMBER_REGEX.test(values.plateNumber);

  if (!prefixOk || !numberOk) {
    errors.plate =
      "A rendszám formátuma legyen: ABC-123 vagy AAAA-123 (3–4 betű, kötőjel, 3 szám).";
  }

  // ---- KAPACITÁS ----
  if (
    !Number.isFinite(values.capacity) ||
    values.capacity < 1 ||
    values.capacity > 200
  ) {
    errors.capacity = "A kapacitás 1 és 200 között legyen.";
  }

  return errors;
}

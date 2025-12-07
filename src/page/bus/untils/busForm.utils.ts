// A form által használt shape – Create + Edit is ezt használhatja
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

// Magyar rendszám: 3–4 betű + 3 szám
export const PLATE_PREFIX_REGEX = /^[A-Z]{3,4}$/;
export const PLATE_NUMBER_REGEX = /^\d{3}$/;

// Közös validáció – ugyanazt hívhatja a Create és az Edit is
export function validateBusForm(values: BusFormValues): BusFormErrors {
  const errors: BusFormErrors = {};

  const trimmedModel = values.model.trim();
  if (!trimmedModel || trimmedModel.length < 2) {
    errors.model = "A modell mező legalább 2 karakter legyen.";
  }

  const prefixOk = PLATE_PREFIX_REGEX.test(values.platePrefix);
  const numberOk = PLATE_NUMBER_REGEX.test(values.plateNumber);
  if (!prefixOk || !numberOk) {
    errors.plate =
      "A rendszám formátuma legyen: ABC-123 vagy AAAA-123 (3–4 betű, kötőjel, 3 szám).";
  }

  if (
    !Number.isFinite(values.capacity) ||
    values.capacity < 1 ||
    values.capacity > 200
  ) {
    errors.capacity = "A kapacitás 1 és 200 között legyen.";
  }

  return errors;
}

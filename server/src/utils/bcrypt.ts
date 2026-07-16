import bcrypt from "bcryptjs";

export const hashValue = async (
  value: string,
  slat: number = 10
): Promise<string> => {
  return await bcrypt.hash(value, slat);
};

export const compareValue = async (
  value: string,
  hashedValue: string
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedValue);
};

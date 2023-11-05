export enum AppRoutes {
  HOME = "/",
  ESTABLISHMENTS = "/establishments",
}

export const getEstablishmentDetailRoute = (
  establishmentId: string | number
) => {
  return `${AppRoutes.ESTABLISHMENTS}/${establishmentId}`;
};

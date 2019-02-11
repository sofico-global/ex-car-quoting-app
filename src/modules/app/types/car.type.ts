export interface Car extends Readonly<{
  carId: string;
  make: {
    makeId: string;
    name: string;
  };

  model: string;
  type: string;
  imgUrl: string;
  fuelType: {
    fuelTypeId: string;
    name: string;
  };
  gearbox: {
    gearboxId: string;
    name: string;
  };
}> {
}

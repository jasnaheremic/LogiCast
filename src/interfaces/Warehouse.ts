export interface WarehouseData {
  id?: string;
  name: string;
  location: string;
  maxCapacity: number;
  usedCapacity?: number;
}

export interface WarehouseCapacityData {
  id: string;
  name: string;
  location: string;
  maxCapacity: number;
  usedCapacity: number;
  capacityUsagePercent: number;
}

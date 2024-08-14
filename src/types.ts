/**
 * Interface representing a toll transaction.
 * @property id - Unique identifier for the transaction.
 * @property vehicleId - ID of the vehicle that was charged.
 * @property tollBoothId - ID of the toll booth where the transaction occurred.
 * @property amountPaid - The amount paid for the toll.
 */
export interface TollTransaction {
  id: number;
  vehicleId: string;
  tollBoothId: string;
  amountPaid: number;
}

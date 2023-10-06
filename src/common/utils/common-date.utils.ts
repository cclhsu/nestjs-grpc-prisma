import { CommonDateDTO } from '../dto/common-date.dto';

export function updateCommonDates(
  original: CommonDateDTO,
  update: CommonDateDTO | undefined,
  updateOnly: boolean = false,
  forced: boolean = false,
): CommonDateDTO {
  const updated: CommonDateDTO = {
    ...original, // Clone the original object
  };

  // Update the dates from update if they exist
  if (update) {
    updated.updatedAt = update.updatedAt ?? updated.updatedAt;
    updated.updatedBy = update.updatedBy ?? updated.updatedBy;

    if (!updateOnly) {
      // Define properties to update conditionally based on the 'forced' flag
      updated.startedAt = update.startedAt ?? updated.startedAt;
      updated.startedBy = forced ? update.startedBy : updated.startedBy;
      updated.startDate = update.startDate ?? updated.startDate;
      updated.endDate = forced ? update.endDate : updated.endDate;
      updated.completedAt = update.completedAt ?? updated.completedAt;
      updated.completedBy = update.completedBy ?? updated.completedBy;
    }
  }

  return updated;
}

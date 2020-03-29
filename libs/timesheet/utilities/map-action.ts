import { EntryState, EntryAction } from '@timesheet/models';

export function mapAction(entryState: EntryState) {
  switch (entryState) {
    case EntryState.new: {
      return [EntryAction.save, EntryAction.cancel];
    }
    case EntryState.active: {
      return [EntryAction.edit, EntryAction.delete];
    }
    default: {
      return [];
    }
  }
}

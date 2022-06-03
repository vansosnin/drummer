export const isFirstNoteInBar = (
  noteIndex: number,
  notesCountInBar: number
): boolean => noteIndex % notesCountInBar === 0;

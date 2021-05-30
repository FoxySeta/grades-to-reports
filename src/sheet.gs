const inputSheetName = 'Ingresso',
      botSheetName = 'Bot',
      firstAnswerCell = [2, 1],
      templateIdCell = [2, 1],
      dataSheetName = 'Uscita',
      studentsGroupCell = [2, 1],
      valutationSessionCell = [2, 2],
      yearCell = [2, 3],
      totalHoursCell = [2, 4],
      firstModuleIdCell = [4, 1],
      modulesColumns = 4
      firstStudentCell = [1, 5];

function getValue(sheet, coordinates) {
  return sheet.getRange(coordinates[0], coordinates[1]).getDisplayValue();
}

function getModules(sheet) {
  return sheet.getRange(firstModuleIdCell[0], firstModuleIdCell[1],
                        sheet.getLastRow() - firstModuleIdCell[0] + 1, modulesColumns).getDisplayValues();
}

function transpose(m) {
  return m[0].map((_, c) => m.map(r => r[c]));
}

function getStudents(sheet) {
  return transpose(
    sheet.getRange(firstStudentCell[0], firstStudentCell[1],
                   sheet.getLastRow() - firstStudentCell[0] + 1, sheet.getLastColumn() - firstStudentCell[1] + 1)
         .getDisplayValues()
  );
}

function sortByModuleID(sheet) {
  sheet.getRange(firstAnswerCell[0], firstAnswerCell[1], sheet.getLastRow() - firstAnswerCell[0] + 1,
  sheet.getLastColumn() - firstAnswerCell[1] + 1).sort({column: 2, ascending: true});
}

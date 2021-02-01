function getFullName() {
  const fullName = Session.getActiveUser().getEmail().split('@')[0].split('.');
  var firstName = fullName[0];
  firstName = firstName[0].toUpperCase() + firstName.slice(1);
  var lastName = fullName[1];
  lastName = lastName[0].toUpperCase() + lastName.slice(1);
  return firstName + ' ' + lastName;
}

function fillInDocuments() {
  const templateId = getValue(SpreadsheetApp.getActiveSpreadsheet().getSheetByName(botSheetName), templateIdCell),
        template = DocumentApp.openById(templateId),
        templateBody = template.getBody(),
        destinationFolder = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId()).getParents().next(),
        dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dataSheetName),
        modules = getModules(dataSheet),
        students = getStudents(dataSheet),
        outputId = DocumentApp.create(outputFileName).getId(),
        output = DocumentApp.openById(outputId),
        outputBody = output.getBody(),
        commonFields = {
          [studentsGroupLabel]: getValue(dataSheet, studentsGroupCell),
          [yearLabel]: getValue(dataSheet, yearCell),
          [valutationSessionLabel]: getValue(dataSheet, valutationSessionCell),
          [hoursLabel]: getValue(dataSheet, totalHoursCell),
          [authorLabel]: getFullName()
        };
  DriveApp.getFileById(outputId).moveTo(destinationFolder);
  outputBody.setAttributes(templateBody.getAttributes());
  students.forEach(function(student, index) {
    Logger.log(index + 1 + "/" + students.length + ": " + student[0]);
    // quadratic search & replace complexity
    fillInDocument(mergeDocuments(outputBody, templateBody),
                   getFields(commonFields, modules, student));
  });
  template.saveAndClose();
  output.saveAndClose();
  Logger.log("Output: " + output.getUrl());
}

function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Fill in documents', 'fillInDocuments').addToUi();
}

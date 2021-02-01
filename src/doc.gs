const studentsGroupLabel = 'classe',
      yearLabel = 'anno',
      valutationSessionLabel = 'periodo',
      totalHoursLabel = 'ore',
      nameLabel = 'nome',
      averageLabel = 'media',
      numberLabel = 'n',
      titleLabel = 'titolo',
      professorLabel = 'titolare',
      hoursLabel = 'ore',
      gradeLabel = 'voto',
      authorLabel = 'autore',
      outputFileName = 'Proposte di voto';

function mergeDocuments(dest, src) {
  const srcNumChildren = src.getNumChildren();
  for (var i = 0; i < srcNumChildren; ++i) {
    const element = src.getChild(i),
          copy = element.copy(),
          // attributes = element.getAttributes(),
          type = element.getType();
    if(type == DocumentApp.ElementType.PARAGRAPH)
      dest.appendParagraph(copy);
    else if(type == DocumentApp.ElementType.TABLE)
      dest.appendTable(copy);
    else if(type == DocumentApp.ElementType.LIST_ITEM)
      dest.appendListItem(copy);
    else
      throw new Error("Unknown element type (" + type + ")");
    // dest.getChild(dest.getNumChildren() - 1).setAttributes(attributes);
  }
  dest.appendPageBreak();
  return dest;
}

function getFields(commonFields, modules, student) {
  var fields = { ...commonFields};
  fields[nameLabel] = student[0];
  fields[averageLabel] = student[1];
  modules.forEach(function(module, index) {
    fields[numberLabel + module[0]] = module[0];
    fields[titleLabel + module[0]] = module[1];
    fields[professorLabel + module[0]] = module[2];
    fields[hoursLabel + module[0]] = module[3];
    fields[gradeLabel + module[0]] = student[3 + index];
  });
  return fields;
}

function fillInDocument(body, data) {
  for(key in data)
    body.replaceText('{{' + key + '}}', data[key],);
  body.replaceText( '{{.*}}', '');
}

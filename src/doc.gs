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
      outputFileName = 'Proposte di voto',
      titleMaxLength = 80;

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

function trimTitle(title) {
  if (title.length <= titleMaxLength)
    return title;
  return title.substring(0, titleMaxLength - 1) + "...";
}

function getFields(commonFields, modules, student) {
  var fields = { ...commonFields};
  fields[nameLabel] = student[0];
  fields[averageLabel] = student[1];
  modules.forEach(function(module, index) {
    fields[numberLabel + (index + 1)] = module[0];
    fields[titleLabel + (index + 1)] = trimTitle(module[1]);
    fields[professorLabel + (index + 1)] = module[2];
    fields[hoursLabel + (index + 1)] = module[3];
    fields[gradeLabel + (index + 1)] = student[3 + index];
  });
  return fields;
}

function fillInDocument(body, data) {
  for(key in data)
    body.replaceText('{{' + key + '}}', data[key],);
  body.replaceText( '{{.*}}', '');
}

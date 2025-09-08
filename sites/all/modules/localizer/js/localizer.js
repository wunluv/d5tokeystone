function localizernode_book_parents(_select, _parent_select_id, _nid_exclude) {
  var parent_select = $("#" + _parent_select_id).get(0);
  localizer_empty_select(parent_select);

  $.ajax({
    type: "GET",
    async: true,
    url: Drupal.settings.localizernode.book_parents_url + Drupal.encodeURIComponent(_select.value) + '/' +
        Drupal.encodeURIComponent(_nid_exclude),
    dataType: "string",
    success: function (data) {
      var items = Drupal.parseJson(data);
      localizer_fill_select(parent_select, items);
    }
  });
};

function localizer_empty_select(_select) {
  if(_select == undefined) return;
  for (var i=_select.length-1; i>=0; i--) {
    _select.remove(i);
  }
};

function localizer_fill_select(_select, _items) {
  if(_select == undefined) return;

  var c = 0;
  for (key in _items) {
    c++;
  }

  for (key in _items) {
    opt=new Option();
    opt.value = key;
    opt.text = _items[key];
    try
    {
      _select.add(opt, null); // standards compliant
    }
    catch(ex)
    {
      _select.add(opt); // IE only
    }
  }
};
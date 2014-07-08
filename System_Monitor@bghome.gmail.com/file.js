const Lang = imports.lang;
const Gio = imports.gi.Gio;

const File = new Lang.Class({
	Name: 'File',

	_init: function(filename) {
		this._filename = filename;
	},

	getContents: function() {
		let file = Gio.File.new_for_path(this._filename);
		let content = '' + file.load_contents(null)[1];
		file.unref();
		return content;
	},

	list: function() {
		let file = Gio.File.new_for_path(this._filename);
		let results = [];
		let file_info, list = file.enumerate_children(Gio.FILE_ATTRIBUTE_STANDARD_NAME, Gio.FileQueryInfoFlags.NONE, null);
		while ((file_info = list.next_file(null)) != null) {
			results.push(file_info.get_attribute_as_string(Gio.FILE_ATTRIBUTE_STANDARD_NAME));
		}
		file.unref();
		return results;
	}
});
/**
 * Created by nbarrios on 6/16/17.
 */

$(document).ready(function () {

	/**
	 * @type {string} The selector to find all rows from the left side (all contacts).
	 */
	const CONTACT_SELECTOR = '#side div.chat';

	/**
	 * @type {string} The selector used to find WhatsApp input
	 */
	const INPUT_SELECTOR = '#main div.input';

	/**
	 * Move cursor/caret to the end of a DIV block marked as contenteditable=true
	 * @param node
	 */
	const moveCaretToEnd = function (node) {
		const range = document.createRange();
		const selection = window.getSelection();
		range.setStart(node.childNodes[0], node.childNodes.length);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	};

	/**
	 * Set the callback to execute after any change in user input.
	 */
	const setUppercase = function () {
		const input = $(INPUT_SELECTOR);
		input.bind('DOMSubtreeModified', function () {
			const content = $(this);
			const value = content.text();
			const valueAsAscii = value.charCodeAt(0);

			if (value.length === 1 && valueAsAscii >= 'a'.charCodeAt(0) && valueAsAscii <= 'z'.charCodeAt(0)) {
				input.text(value.toUpperCase());
				moveCaretToEnd(this);
			}
		});
	};

	/**
	 * Tries to find the input. If it is already loaded, then sets a listener on it. If not, then executes wait() again.
	 */
	const trySearch = function () {

		const contacts = $(CONTACT_SELECTOR);
		if (contacts.get().length > 0) {
			contacts.bind('click', setUppercase);
		}
	};

	setInterval(trySearch, 5000);
});

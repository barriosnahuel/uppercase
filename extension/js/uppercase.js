/**
 * Created by nbarrios on 6/16/17.
 */

$(document).ready(function () {

	/**
	 * @type {string} The selector to find all rows from the left side (all contacts).
	 */
	const CONTACT_SELECTOR = 'div.chat';

	/**
	 * @type {string} The selector used to find WhatsApp input
	 */
	const INPUT_SELECTOR = 'div.input';

	/**
	 * Wait a little time and fire trySearch() method.
	 */
	const wait = function () {
		const ms = 2000;
		console.debug('Waiting for %dms...', ms);
		setTimeout(trySearch, ms);
	};

	/**
	 * Tries to find the input. If it is already loaded, then sets a listener on it. If not, then executes wait() again.
	 */
	const trySearch = function () {

		const setUppercase = function () {
			const input = $(INPUT_SELECTOR);
			input.bind('DOMSubtreeModified', function () {

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

				const content = $(this);
				const value = content.text();
				const valueAsAscii = value.charCodeAt(0);
				const LOWERCASE_A = 97;
				const LOWERCASE_Z = 122;

				if (value.length === 1 && valueAsAscii >= LOWERCASE_A && valueAsAscii <= LOWERCASE_Z) {
					input.text(value.toUpperCase());
					moveCaretToEnd(this);
				}
			});
		};

		const contacts = $(CONTACT_SELECTOR);
		if (contacts.get().length > 0) {
			contacts.click(setUppercase);
		} else {
			wait();
		}
	};

	wait();
});

/**
 * Created by nbarrios on 6/16/17.
 */

$(document).ready(function () {

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

		const input = $(INPUT_SELECTOR);
		if (input.get().length > 0) {
			input.on("DOMSubtreeModified", function () {
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
		} else {
			wait();
		}
	};

	wait();
});

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Tiny Preview user interface implementation.
 *
 * @module      tiny_preview/ui
 * @copyright   2022 Daniel Thies <dethies@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Modal from 'tiny_preview/modal';
import {exception as displayException} from 'core/notification';
import {notifyFilterContentUpdated} from 'core_filters/events';
import * as Options from './options';
import * as TinyPreviewRepository from 'tiny_preview/repository';

export const handleAction = (editor) => {
    displayDialogue(editor);
};

/**
 * Get the template context for the dialogue.
 *
 * @param {Editor} editor
 * @param {object} data
 * @returns {object} data
 */
const getTemplateContext = (editor, data) => {

    return TinyPreviewRepository.filterContent(
        Options.getContextId(editor),
        editor.getBody().innerHTML
    ).then(result => {
        return Object.assign(result, {
            elementid: editor.id,
            showOptions: false,
        }, data);
    }).catch(displayException);
};

const displayDialogue = async(editor, data = {}) => {
    const modal = await Modal.create({
            type: Modal.TYPE,
            templateContext: await getTemplateContext(editor, data),
            large: true,
        }),
        $root = await modal.getRoot(),
        root = $root[0];

    await modal.show();
    breakHyperLinks(root);
    notifyFilterContentUpdated(root);
};

/**
 * Break hyperlinks in the content to prevent accidental navigation away from editor page.
 * @param {HTMLElement} element
 */
const breakHyperLinks = (element) => {
    const links = element.querySelectorAll('a:not([target="_blank"])');
    links.forEach(link => {
        // Add blank target to link to force open in a new tab.
        link.setAttribute('target', '_blank');
    });
};

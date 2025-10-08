<?php
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

namespace tiny_preview\external;

use advanced_testcase;

/**
 * Class filter_test
 *
 * @package     tiny_preview
 * @copyright   2020 bdecent gmbh <https://bdecent.de>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @group tiny_preview
 * @covers \tiny_preview\external\filter
 */
final class filter_test extends advanced_testcase {
    /** @var stdClass */
    private $course;

    /** @var stdClass */
    private $videotimeinstance;

    /** @var stdClass */
    private $student;

    public function setUp(): void {
        $this->course = $this->getDataGenerator()->create_course();
        $this->student = $this->getDataGenerator()->create_user();
        $this->getDataGenerator()->enrol_user($this->student->id, $this->course->id);

        parent::setUp();
    }

    public function tearDown(): void {
        $this->course = null;
        $this->student = null;
        parent::tearDown();
    }

    public function test_filter(): void {
        $this->resetAfterTest();
        $context = \core\context\course::instance($this->course->id);

        $this->setUser($this->student);

        $content = 'cat';

        $result = filter::execute($context->id, $content);

        $this->assertEquals($content, $result['content']);
    }
}

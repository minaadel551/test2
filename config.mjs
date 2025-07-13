/* Copyright (C) 2023-2025 anonymous

This file is part of PSFree.

PSFree is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

PSFree is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

// تم تبسيط الكود ليعمل فقط مع PS4 بإصدار 9.00

export function set_target(value) {
    // تم تبسيط الدالة للعمل فقط مع PS4 بإصدار 9.00
    target = 0x900; // PS4 firmware 9.00 only
}

export let target = null;
set_target(0x900);

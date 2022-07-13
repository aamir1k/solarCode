/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// THIS CODE IS GENERATED - DO NOT MODIFY.
const u = undefined;
function plural(val) {
    const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, '').length;
    if (i === 1 && v === 0)
        return 1;
    if (v === 0 && (i % 10 === Math.floor(i % 10) && (i % 10 >= 2 && i % 10 <= 4) && !(i % 100 >= 12 && i % 100 <= 14)))
        return 3;
    if (v === 0 && (!(i === 1) && (i % 10 === Math.floor(i % 10) && (i % 10 >= 0 && i % 10 <= 1))) || (v === 0 && (i % 10 === Math.floor(i % 10) && (i % 10 >= 5 && i % 10 <= 9)) || v === 0 && (i % 100 === Math.floor(i % 100) && (i % 100 >= 12 && i % 100 <= 14))))
        return 4;
    return 5;
}
export default ["pl", [["a", "p"], ["AM", "PM"], u], u, [["n", "p", "w", "ś", "c", "p", "s"], ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."], ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"], ["nie", "pon", "wto", "śro", "czw", "pią", "sob"]], [["N", "P", "W", "Ś", "C", "P", "S"], ["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."], ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"], ["nie", "pon", "wto", "śro", "czw", "pią", "sob"]], [["s", "l", "m", "k", "m", "c", "l", "s", "w", "p", "l", "g"], ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"], ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]], [["S", "L", "M", "K", "M", "C", "L", "S", "W", "P", "L", "G"], ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"], ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"]], [["p.n.e.", "n.e."], u, ["przed naszą erą", "naszej ery"]], 1, [6, 0], ["d.MM.y", "d MMM y", "d MMMM y", "EEEE, d MMMM y"], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1}, {0}", u, "{1} {0}", u], [",", " ", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0%", "#,##0.00 ¤", "#E0"], "PLN", "zł", "złoty polski", { "AUD": [u, "$"], "CAD": [u, "$"], "CNY": [u, "¥"], "GBP": [u, "£"], "HKD": [u, "$"], "ILS": [u, "₪"], "INR": [u, "₹"], "JPY": [u, "¥"], "KRW": [u, "₩"], "MXN": [u, "$"], "NZD": [u, "$"], "PHP": [u, "₱"], "PLN": ["zł"], "RON": [u, "lej"], "TWD": [u, "NT$"], "USD": [u, "$"], "VND": [u, "₫"] }, "ltr", plural];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCwwQ0FBMEM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBRXBCLFNBQVMsTUFBTSxDQUFDLEdBQVc7SUFDM0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRWpHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNsQixPQUFPLENBQUMsQ0FBQztJQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9HLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlQLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsT0FBTyxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQsZUFBZSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLFVBQVUsRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsaUJBQWlCLEVBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxnQkFBZ0IsQ0FBQyxFQUFDLENBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsZUFBZSxDQUFDLEVBQUMsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLGNBQWMsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWS5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbCh2YWw6IG51bWJlcik6IG51bWJlciB7XG5jb25zdCBuID0gdmFsLCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKSwgdiA9IHZhbC50b1N0cmluZygpLnJlcGxhY2UoL15bXi5dKlxcLj8vLCAnJykubGVuZ3RoO1xuXG5pZiAoaSA9PT0gMSAmJiB2ID09PSAwKVxuICAgIHJldHVybiAxO1xuaWYgKHYgPT09IDAgJiYgKGkgJSAxMCA9PT0gTWF0aC5mbG9vcihpICUgMTApICYmIChpICUgMTAgPj0gMiAmJiBpICUgMTAgPD0gNCkgJiYgIShpICUgMTAwID49IDEyICYmIGkgJSAxMDAgPD0gMTQpKSlcbiAgICByZXR1cm4gMztcbmlmICh2ID09PSAwICYmICghKGkgPT09IDEpICYmIChpICUgMTAgPT09IE1hdGguZmxvb3IoaSAlIDEwKSAmJiAoaSAlIDEwID49IDAgJiYgaSAlIDEwIDw9IDEpKSkgfHwgKHYgPT09IDAgJiYgKGkgJSAxMCA9PT0gTWF0aC5mbG9vcihpICUgMTApICYmIChpICUgMTAgPj0gNSAmJiBpICUgMTAgPD0gOSkpIHx8IHYgPT09IDAgJiYgKGkgJSAxMDAgPT09IE1hdGguZmxvb3IoaSAlIDEwMCkgJiYgKGkgJSAxMDAgPj0gMTIgJiYgaSAlIDEwMCA8PSAxNCkpKSlcbiAgICByZXR1cm4gNDtcbnJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXCJwbFwiLFtbXCJhXCIsXCJwXCJdLFtcIkFNXCIsXCJQTVwiXSx1XSx1LFtbXCJuXCIsXCJwXCIsXCJ3XCIsXCLFm1wiLFwiY1wiLFwicFwiLFwic1wiXSxbXCJuaWVkei5cIixcInBvbi5cIixcInd0LlwiLFwixZtyLlwiLFwiY3p3LlwiLFwicHQuXCIsXCJzb2IuXCJdLFtcIm5pZWR6aWVsYVwiLFwicG9uaWVkemlhxYJla1wiLFwid3RvcmVrXCIsXCLFm3JvZGFcIixcImN6d2FydGVrXCIsXCJwacSFdGVrXCIsXCJzb2JvdGFcIl0sW1wibmllXCIsXCJwb25cIixcInd0b1wiLFwixZtyb1wiLFwiY3p3XCIsXCJwacSFXCIsXCJzb2JcIl1dLFtbXCJOXCIsXCJQXCIsXCJXXCIsXCLFmlwiLFwiQ1wiLFwiUFwiLFwiU1wiXSxbXCJuaWVkei5cIixcInBvbi5cIixcInd0LlwiLFwixZtyLlwiLFwiY3p3LlwiLFwicHQuXCIsXCJzb2IuXCJdLFtcIm5pZWR6aWVsYVwiLFwicG9uaWVkemlhxYJla1wiLFwid3RvcmVrXCIsXCLFm3JvZGFcIixcImN6d2FydGVrXCIsXCJwacSFdGVrXCIsXCJzb2JvdGFcIl0sW1wibmllXCIsXCJwb25cIixcInd0b1wiLFwixZtyb1wiLFwiY3p3XCIsXCJwacSFXCIsXCJzb2JcIl1dLFtbXCJzXCIsXCJsXCIsXCJtXCIsXCJrXCIsXCJtXCIsXCJjXCIsXCJsXCIsXCJzXCIsXCJ3XCIsXCJwXCIsXCJsXCIsXCJnXCJdLFtcInN0eVwiLFwibHV0XCIsXCJtYXJcIixcImt3aVwiLFwibWFqXCIsXCJjemVcIixcImxpcFwiLFwic2llXCIsXCJ3cnpcIixcInBhxbpcIixcImxpc1wiLFwiZ3J1XCJdLFtcInN0eWN6bmlhXCIsXCJsdXRlZ29cIixcIm1hcmNhXCIsXCJrd2lldG5pYVwiLFwibWFqYVwiLFwiY3plcndjYVwiLFwibGlwY2FcIixcInNpZXJwbmlhXCIsXCJ3cnplxZtuaWFcIixcInBhxbpkemllcm5pa2FcIixcImxpc3RvcGFkYVwiLFwiZ3J1ZG5pYVwiXV0sW1tcIlNcIixcIkxcIixcIk1cIixcIktcIixcIk1cIixcIkNcIixcIkxcIixcIlNcIixcIldcIixcIlBcIixcIkxcIixcIkdcIl0sW1wic3R5XCIsXCJsdXRcIixcIm1hclwiLFwia3dpXCIsXCJtYWpcIixcImN6ZVwiLFwibGlwXCIsXCJzaWVcIixcIndyelwiLFwicGHFulwiLFwibGlzXCIsXCJncnVcIl0sW1wic3R5Y3plxYRcIixcImx1dHlcIixcIm1hcnplY1wiLFwia3dpZWNpZcWEXCIsXCJtYWpcIixcImN6ZXJ3aWVjXCIsXCJsaXBpZWNcIixcInNpZXJwaWXFhFwiLFwid3J6ZXNpZcWEXCIsXCJwYcW6ZHppZXJuaWtcIixcImxpc3RvcGFkXCIsXCJncnVkemllxYRcIl1dLFtbXCJwLm4uZS5cIixcIm4uZS5cIl0sdSxbXCJwcnplZCBuYXN6xIUgZXLEhVwiLFwibmFzemVqIGVyeVwiXV0sMSxbNiwwXSxbXCJkLk1NLnlcIixcImQgTU1NIHlcIixcImQgTU1NTSB5XCIsXCJFRUVFLCBkIE1NTU0geVwiXSxbXCJISDptbVwiLFwiSEg6bW06c3NcIixcIkhIOm1tOnNzIHpcIixcIkhIOm1tOnNzIHp6enpcIl0sW1wiezF9LCB7MH1cIix1LFwiezF9IHswfVwiLHVdLFtcIixcIixcIsKgXCIsXCI7XCIsXCIlXCIsXCIrXCIsXCItXCIsXCJFXCIsXCLDl1wiLFwi4oCwXCIsXCLiiJ5cIixcIk5hTlwiLFwiOlwiXSxbXCIjLCMjMC4jIyNcIixcIiMsIyMwJVwiLFwiIywjIzAuMDDCoMKkXCIsXCIjRTBcIl0sXCJQTE5cIixcInrFglwiLFwiesWCb3R5IHBvbHNraVwiLHtcIkFVRFwiOlt1LFwiJFwiXSxcIkNBRFwiOlt1LFwiJFwiXSxcIkNOWVwiOlt1LFwiwqVcIl0sXCJHQlBcIjpbdSxcIsKjXCJdLFwiSEtEXCI6W3UsXCIkXCJdLFwiSUxTXCI6W3UsXCLigqpcIl0sXCJJTlJcIjpbdSxcIuKCuVwiXSxcIkpQWVwiOlt1LFwiwqVcIl0sXCJLUldcIjpbdSxcIuKCqVwiXSxcIk1YTlwiOlt1LFwiJFwiXSxcIk5aRFwiOlt1LFwiJFwiXSxcIlBIUFwiOlt1LFwi4oKxXCJdLFwiUExOXCI6W1wiesWCXCJdLFwiUk9OXCI6W3UsXCJsZWpcIl0sXCJUV0RcIjpbdSxcIk5UJFwiXSxcIlVTRFwiOlt1LFwiJFwiXSxcIlZORFwiOlt1LFwi4oKrXCJdfSxcImx0clwiLCBwbHVyYWxdO1xuIl19
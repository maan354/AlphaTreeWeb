(function () {
    "use strict";
    window.Mcli = window.Mcli || {};    //MDS Support: Type.registerNamespace("ag2rlm");


    Mcli.JsHerlpersManager = function () {
        "use strict";

        var publics = {
            SortByArray: sortByArray,
            sortByArrayKeys: sortByArrayKeys,
            sortByKey: sortByKey,
            sortBykeysAndDate: sortBykeysAndDate,
            OdataPropertyMutlipeEquals: OdataPropertyMutlipeEquals,
            OdataPropertyMutlipeEqualsString: OdataPropertyMutlipeEqualsString,
            OdataInAudienceOrEmpty: OdataInAudienceOrEmpty,
            OdataOperator: OdataOperator,
            camlOrderBy: camlOrderBy,
            camlWhere: camlWhere,
            camlOr: camlOr,
            camlAnd: camlAnd,
            camlGeq: camlGeq,
            camlNeq: camlNeq,
            camlContains: camlContains,
            camlMultipleContains: camlMultipleContains,
            camlIsNull: camlIsNull,
            camlIsNotNull: camlIsNotNull,
            camlIn: camlIn,
            getAudienceQuery: getAudienceQuery,
            getQuery: getQuery,
            toJson: toJson,
            parse_with_fns: parse_with_fns,
            stringify_with_fns: stringify_with_fns,
            getUrlFromHtml: getUrlFromHtml,
            SetRenditionID: SetRenditionID,
            getDate: getDate,
            dateDiffInDays: dateDiffInDays,
            formatDateYearMonthDay: formatDateYearMonthDay,
            formatDateYearMonthDayHours: formatDateYearMonthDayHours,
            getTaxo: getTaxo,
            JsomUsersGet: JsomUsersGet,
            JsomTaxoGet: JsomTaxoGet,
            range: range,
            guid: guid,
            getResultFromRestResponse: getResultFromRestResponse,
            getIDsFromResults: getIDsFromResults,
            isEmpty: isEmpty,
            isObjectEmpty: isObjectEmpty,
            QueryString: QueryString,
            loadScript: loadScript,
            loadFiles: loadFiles,
            detectIE: detectIE,
            containsAll: containsAll
        };
        //#region private vars

        /******** Transforamtions *****/
        //create a table from start index and 
        function range(start, count) {
            return Array.apply(0, Array(count))
                .map(function (element, index) {
                    return index + start;
                });
        }
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        /**********Rest helpers */
        //get Taxo form TaxoFieldValue
        function getTaxo(taxoValue) {
            var values = [];
            if (!taxoValue || taxoValue.results.length < 1)
                return values;

            for (var j = 0; j < taxoValue.results.length; j++) {
                var item = {}
                item.Label = taxoValue.results[j].Label
                item.TermGuid = taxoValue.results[j].TermGuid
                item.WssId = taxoValue.results[j].WssId
                values.push(item)
            }
            return values
        }

        //get result from rest response
        function getResultFromRestResponse(data) {
            if (typeof data !== "undefined" && typeof data.d !== "undefined" && typeof data.d.results !== "undefined") {
                return data.d.results;
            } else {
                return null;
            }
        }

        //get result table of Ids from rest response
        function getIDsFromResults(data) {
            if (typeof data !== "undefined" && typeof data.d !== "undefined" && typeof data.d.results !== "undefined") {
                if (data.d.results.length < 1) {
                    return [];
                }
                return data.d.results.map(function (e) {
                    return e.ID;
                }
                )
            } else {
                return [];
            }
        }

        /******************End rest helpers*************************** */
        /*********************Jsom helpers********************* */
        //return an array of taxo from TaxoFieldValue
        function JsomTaxoGet(value) {
            var result = []
            if (!value)
                return result;

            result = []
            //multi
            if (value._ObjectType_ == "SP.Taxonomy.TaxonomyFieldValueCollection" || value.constructor == SP.Taxonomy.TaxonomyFieldValueCollection) {
                if (!value._Child_Items_) {
                    for (var i = 0; i < value.get_count(); i++) {
                        var taxValue = {}
                        taxValue.Label = value.get_item(i).get_label();
                        taxValue.TermGuid = value.get_item(i).get_termGuid();
                        taxValue.WssId = value.get_item(i).get_wssId();
                        result.push(taxValue);
                    }
                    return result;
                }
                for (var j = 0; j < value._Child_Items_.length; j++) {
                    var taxValue = {}
                    taxValue.Label = value._Child_Items_[j].Label
                    taxValue.TermGuid = value._Child_Items_[j].TermGuid
                    taxValue.WssId = value._Child_Items_[j].WssId
                    result.push(taxValue);
                }
            } else {
                var taxValue = {}
                taxValue.Label = value._Child_Items_[j].Label
                taxValue.TermGuid = value._Child_Items_[j].TermGuid
                taxValue.WssId = value._Child_Items_[j].WssId
                result.push(taxValue);
            }
            return result;
        }

        function JsomUsersGet(value) {
            var result = []
            if (!value)
                return result;

            result = []
            //multi
            if (value.constructor == Array) {
                for (var j = 0; j < value.length; j++) {
                    if (value[j].constructor == SP.FieldUserValue) {
                        var user = {}
                        user.Id = value[j].get_lookupId()
                        user.Name = value[j].get_lookupValue()
                        user.Email = value[j].get_email()
                        result.push(user);
                    }
                }
            } else if (value.constructor == SP.FieldUserValue) {
                var user = {}
                user.Id = value.get_lookupId()
                user.Name = value.get_lookupValue()
                user.Email = value.get_email()
                result.push(user);
            }

            return result;
        }
        /********************End Jsom Helpers********************* */
        function isEmpty(value, notStruct) {
            if (typeof value == 'undefined' || value == null || value.length < 1)
                return true;

            if (!notStruct)
                if (value == 'undefined')
                    return true

            return false;

        }
        function isObjectEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }

            return true;
        }

        var isIE = null;
        function detectIE() {
            if (isIE == null)
                isIE = _detectIE();

            return isIE;
        }

        function _detectIE() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        }

        /******** Transforamtions *****/

        /******** Urls *****/
        function loadScript(url, baseUrl) {
            var dfd = new jQuery.Deferred();
            function callback() {
                dfd.resolve();
            }
            var script = $("script[src*='" + url + "'");
            if (script.length > 0) {
                setTimeout(callback, 10);
                console.log(url + " aleary loaded");
                return dfd.promise();
            }
            url = baseUrl + url;
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            script.onreadystatechange = callback;
            script.onload = callback;

            // Fire the loading
            head.appendChild(script);
            console.log(url + " loading ...");
            return dfd.promise();
        }

        function loadFiles(files) {
            var dfd = new jQuery.Deferred();
            // var baseUrl = ag2rlm.Constants.webUrl + ag2rlm.Constants.Assets.path + ag2rlm.Constants.jsCompentnBase;
            var baseUrl = RootWebUrl + ag2rlm.Constants.Assets.path + ag2rlm.Constants.jsCompentnBase;
            var calls = [];
            files.forEach(function (element) {
                calls.push(loadScript(element, baseUrl));
            }, this);

            $.when.apply(null, calls).then(function () {
                if (detectIE()) {
                    setTimeout(function () {
                        console.log("IE Done loaded");
                        dfd.resolve();
                    }, 1000);
                }
                else {
                    console.log("Not IE Done loaded");
                    dfd.resolve();
                }

            }
            )
            var obj = {}
            obj.Filesloaded = dfd.promise();
            return obj;
        }

        function QueryString() {
            // This function is anonymous, is executed immediately and 
            // the return value is assigned to QueryString!
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                // If first entry with this name
                if (typeof query_string[pair[0]] === "undefined") {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === "string") {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }

            return query_string;
        }
        /******** Urls *****/

        function containsAll(array_a, array_b) {
            if ($.type(array_a) == "string")
                return array_b.indexOf(array_a) !== -1;

            return $.grep(array_a, function (v, i) {
                return $.inArray(v, array_b) !== -1;
            }).length > 0;
        }


        function sortByArray(arrayToSort, sortByThisArray, prop) {
            var result = []
            sortByThisArray.forEach(function (key) {
                var found = false;
                arrayToSort = arrayToSort.filter(function (item) {
                    if (!found && item[prop] == key) {
                        result.push(item);
                        found = true;
                        return false;
                    } else
                        return true;
                })
            })
            return result;
        }


        function sortByArrayKeys(arrayToSort, prop1, sortByThisArray, prop2, addThis) {
            var result = []
            sortByThisArray.forEach(function (e1) {
                var found = false;
                arrayToSort = arrayToSort.filter(function (item) {
                    if (!found && item[prop1] == e1[prop2]) {
                        if (addThis)
                            item[addThis] = e1[addThis];
                        result.push(item);
                        found = true;
                        return false;
                    } else
                        return true;
                })
            })
            return result;
        }
        function sortByKey(ar, key, desc) {
            ar.sort(function (a, b) {
                if (desc)
                    return a[key] < b[key];
                else
                    return a[key] > b[key];
            });
            return ar;
        }
        function sortBykeysAndDate(ar, key, desc, key2, desc2) {
            ar.sort(function (a, b) {
                if (a[key] == b[key]) {
                    if (desc2)
                        return new Date(a[key2]) < new Date(b[key2]);
                    else
                        return new Date(a[key2]) > new Date(b[key2]);
                }

                if (desc)
                    return a[key] < b[key];
                else
                    return a[key] > b[key];
            });
            return ar;
        }
        function toJson(obj) {
            var json = JSON.stringify(obj, function (key, value) {
                if (typeof value === 'function') {
                    return value.toString();
                } else {
                    return value;
                }
            });
            return json;
        }
        /************************/

        function stringify_with_fns(obj) {
            return JSON.stringify(obj, function (key, value) {
                return typeof value === "function" ? value.toString() : value;
            });
        }


        function parse_with_fns(json) {
            return JSON.parse(json, function (key, value) {
                if (looks_like_a_function_string(value)) {
                    return make_function_from_string(value);
                } else {
                    return value;
                }
            });
        }

        function looks_like_a_function_string(value) {
            //            return /^function.*?\(.*?\)\s*\{.*\}$/.test(value);

            // return /^function.*\(.*\)/.test(value);
            return /^function(.|[\r\n])*\((.|[\r\n])*\)(.|[\r\n])*\{(.|[\r\n])*\}$/.test(value);
        }
        //function make_function_from_string(value) {
        //    return eval(value);
        //}

        function make_function_from_string(value) {
            var args = value
                .replace(/\/\/.*$|\/\*[\s\S]*?\*\//mg, '') //strip comments
                .match(/\(.*?\)/m)[0]                      //find argument list
                .replace(/^\(|\)$/, '')                    //remove parens
                .match(/[^\s(),]+/g) || [],                //find arguments
                body = value.match(/\{((.|[\r\n])*)\}/)[1]  //extract body between curlies
            return Function.apply(0, args.concat(body));
        }


        /****************/
        function OdataPropertyMutlipeEquals(Property, _values) {
            var values = _values;
            if ($.type(_values) == "string")
                values = _values.split(",");

            var result;
            for (var i = 0; i < values.length; i++) {
                if (i == 0)
                    result = Property + " eq " + values[i] + " ";
                else
                    result += "or " + Property + " eq " + values[i] + " ";
            }

            return result;
        }

        function OdataPropertyMutlipeEqualsString(Property, _values) {
            var values = _values;
            if ($.type(_values) == "string")
                values = _values.split(",");

            var result;
            for (var i = 0; i < values.length; i++) {
                if (i == 0)
                    result = Property + " eq '" + values[i] + "' ";
                else
                    result += "or " + Property + " eq '" + values[i] + "' ";
            }

            return result;
        }

        function OdataInAudienceOrEmpty(Property, _values, field) {
            var result;
            if (typeof field != 'undefined')
                result = OdataPropertyMutlipeEquals(Property + "/" + field, _values)
            else
                result = OdataPropertyMutlipeEquals(Property, _values)

            result += " or " + Property + " eq null";
            return result;
        }

        function OdataOperator(condition1, condition2, operator) {
            return "(" + condition1 + ") " + operator + " (" + condition2 + ")"
        }



        //#endregion private vars

        //#region Private Functions

        //Utility function to return a fulfilled promise, used only for testing and prototyping

        function camlOr(c1, c2) {
            return "<Or>" + c1 + c2 + "</Or>"
        }

        function camlAnd(c1, c2) {
            return "<And>" + c1 + c2 + "</And>"
        }
        function camlContains(fieldName, value) {
            return '<Contains> <FieldRef Name="' + fieldName + '" /> <Value Type="Text">' + value + '</Value> </Contains>';
        }

        function camlIsNotNull(fieldName) {
            return '<IsNotNull>  <FieldRef Name="' + fieldName + '" /> </IsNotNull>'
        }

        function camlIsNull(fieldName) {
            return '<IsNull>  <FieldRef Name="' + fieldName + '" /> </IsNull>'
        }

        function camlWhere(conditions) {
            return " <Where>" + conditions + "</Where>";
        }
        function camlGeq(conditions) {
            return " <Geq>" + conditions + "</Geq>";
        }
        function camlNeq(fieldName, value, type) {
            if (!type)
                type = "Text";

            return '<Neq>  <FieldRef Name="' + fieldName + '" />  <Value Type="' + type + '">' + value + '</Value></Neq>';
        }
        function camlMultipleContains(fieldName, _values) {
            var values = _values;
            if ($.type(_values) == "string")
                values = _values.split(",");

            if (!values)
                return camlContains(fieldName, "");

            var result = camlContains(fieldName, values[0]);
            for (var i = 0; i < values.length; i++) {
                result = camlOr(result, camlContains(fieldName, values[i]));
            }
            return result;
        }

        function camlIn(fieldName, _values, type) {
            var values = _values;
            if ($.type(_values) == "string") {
                if (_values.indexOf(",") > -1)
                    values = _values.split(",")
                else (_values.indexOf("|") > -1)
                values = _values.split("|")
            }
            if (!type)
                type = "Text";

            var result = ' <In> <FieldRef Name="' + fieldName + '" /><Values>'
            for (var i = 0; i < values.length; i++) {
                result += '<Value Type="' + type + '">' + values[i] + '</Value>'
            }
            result += "  </Values></In>"
            return result;
        }

        function camlOrderBy(fieldName) {
            return '<OrderBy><FieldRef Name="' + fieldName + '" /></OrderBy>'
        }

        function getAudienceQuery(audienceFieldName, AudienceGroups) {
            return camlOr(camlMultipleContains(audienceFieldName, AudienceGroups), camlIsNull(audienceFieldName));
        }

        function getQuery(obj) {

            var querySetting = {
                viewOptions: obj.viewOptions ? obj.viewOptions : "",
                where: obj.where ? "<Where>" + obj.where + "</Where>" : "",
                orderBy: obj.orderBy ? "<OrderBy>" + obj.orderBy + "</OrderBy>" : "",
                ViewFields: obj.ViewFields ? "<ViewFields>" + obj.ViewFields + "</ViewFields>" : "",
                rowlimit: obj.rowlimit ? "<RowLimit>" + obj.rowlimit + "</RowLimit>" : "",
            }

            return ag2rlm.Constants.QueryTemplate.replace("{Options}", querySetting.viewOptions).replace("{ViewFields}", querySetting.ViewFields).replace("{RowLimit}", querySetting.rowlimit).replace("{Where}", querySetting.where).replace("{OrderBy}", querySetting.orderBy)
        }

        function getUrlFromHtml(html) {
            if (html)
                return $(html).attr("src") ? $(html).attr("src") : $(html).attr("href")
            else
                return "";
        }

        function SetRenditionID(url, id) {
            var result = url;
            try {
                if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)
                    result = url;
                else
                    result = url.split("?")[0] + "?RenditionID=" + id
            } catch (e) {

            }
            return result;
        }

        function formatDateYearMonthDayHours(dateToFo, defaultValue) {
            if (!defaultValue)
                defaultValue = ""
            try {
                var dateToReturn = new Date(dateToFo)
                if (!dateToReturn)
                    return defaultValue;
                return dateToReturn.getDate() + "/" + (dateToReturn.getMonth() + 1) + "/" + dateToReturn.getFullYear() + " " +
                    ("00" + dateToReturn.getHours()).slice(-2) + ":" +
                    ("00" + dateToReturn.getMinutes()).slice(-2) + ":" +
                    ("00" + dateToReturn.getSeconds()).slice(-2);

            }
            catch (err) {
                return defaultValue;
            }

        }


        var _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {
            // Discard the time and time-zone information.
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }

        Date.prototype.OffSetMonths = function (monthOffset) {
            //copy the date
            var dt = new Date(this);
            dt.setMonth(dt.getMonth() + monthOffset);
            return dt;
        };
        function formatDateYearMonthDay(dateToFo, defaultValue) {
            if (!defaultValue)
                defaultValue = ""
            try {
                var dateToReturn = getDate(dateToFo, null)
                if (!dateToReturn)
                    return defaultValue;
                return dateToReturn.getDate() + "/" + (dateToReturn.getMonth() + 1) + "/" + dateToReturn.getFullYear();

            }
            catch (err) {
                return defaultValue;
            }

        }

        function getDate(dateToFo, defaultValue) {
            if (!defaultValue)
                defaultValue = null
            try {
                var date = new Date("" + dateToFo);
                if (isNaN(date.getTime())) {
                    return defaultValue
                }
                return date;
            } catch (err) {
                return defaultValue;
            }

        }
        //#endregion Private Functions
        return publics;
    };
    ag2rlm.JsUtility = new ag2rlm.JsHerlpersManager();
})();


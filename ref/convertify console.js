var cageCards = ApplicationEntity
    .getResultSet("_CageCard")
    .query("status.ID='Active'");

CustomUtils.uga_entitySetMap(historyItems, function (item) {
    convertify(item);
});

function convertify(entity) {
    var NGROKURL = "http://75f322e8.ngrok.io";
    if (entity) {
        var payload = JSON.stringify(mongify(entity), null, null)
        if (payload) {
            var xmlHttp = new ActiveXObject("MSXML2.XMLHTTP.6.0")
            xmlHttp.open("POST", NGROKURL + "/create/uga_cageCard_history", false)
            xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            xmlHttp.send(payload);
        } else {
            log("WARN", "Unable to send http request for " + entity.ID)
        }
    }
}

/**
 * ? Last Updated - 9/15/19 - phillip dodd
 * @description - generates an object containing an entity's data for submission to mongo
 * ! put on ApplicationEntity eType
 * @returns {Object}
 */
function mongify(entity) {
    var DEBUG = true;
    var PREFIX = "[" + entity.getEntityTypeName() + "](mongify): ";
    //? Use like: log("DEBUG", "Debug message goes here") or log("INFO", "Info Message goes here")
    var log = createLoggerForPrefix(PREFIX);

    try {

        //* Assertions and Declarations

        if (DEBUG) log("DEBUG", "Passed Assertion Block");

        //* Execution

        var result = {"oid": entity + ""};

        //? getAllForEType() Returns an enumeration
        var attributes = AttributeDescription.getAllForEType(entity.getType());
        var count = attributes.count();
        var dataType, qualifiedName;
        for (var i = 1; i <= count; i++) {
            dataType = attributes(i).getDataType();
            qualifiedName = attributes(i).getQualifiedName();
            var value = entity.getQualifiedAttribute(qualifiedName);
            if (value) {
                if (~dataType.indexOf("Set/") && value && value.count) {
                    var oidArray = [];
                    var valueEnum = value.elements();
                    for (var j = 1; j <= value.count; j++) {
                        if (qualifiedName == "customAttributes.uga_invoice_item_set") {
                            oidArray.push(mongify(valueEnum(j)));
                        } else {
                            oidArray.push(valueEnum(j) + "");
                        }
                    }
                    result[qualifiedName] = oidArray;
                } else {
                    result[qualifiedName] = value + "";
                }
            }
        }
        return result;

        //* Functions

        /**
         * @description uses the defined PREFIX to create a logging function that will concatenate the log level,
         * the prefix, and the message. 
         * @param {String} PREFIX - [Entity Type](methodName)
         * @returns {Function}
         */
        function createLoggerForPrefix(PREFIX) {
            /**
             * @param {String} logLevel - "DEBUG", "INFO", "ERROR", "WARN"
             * @param {String} message
             * @returns {undefined}
             */
            return function logger(logLevel, message) {
                wom.log(logLevel.match(/\S.*\S/g)[0] + " " + PREFIX.match(/\S.*\S/g)[0] + " " + message);
            }
        };

    } catch (e) {
        log("ERROR", e.description);
        throw e;
    }
}
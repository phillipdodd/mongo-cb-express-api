/**
 * ? Last Updated - 9/15/19 - phillip dodd
 * @description - generates an object used for creating mongodb schema.
 * ! put on ApplicationEntity eType
 * @returns {Object}
 */
function getMongoSchema() {
    var DEBUG = true;
    var PREFIX = "[" + this.getEntityTypeName() + "](getMongoSchema): ";
    //? Use like: log("DEBUG", "Debug message goes here") or log("INFO", "Info Message goes here")
    var log = createLoggerForPrefix(PREFIX);

    try {

        //* Assertions and Declarations

        if (DEBUG) log("DEBUG", "Passed Assertion Block");

        //* Execution

        var result = {};

        //? getAllForEType() Returns an enumeration
        var attributes = AttributeDescription.getAllForEType(this.getType());
        var count = attributes.count();
        var dataType;
        for (var i = 1; i <= count; i++) {
            dataType = attributes(i).getDataType();
            dataType = correctForMongoose(dataType);
            result[attributes(i).getQualifiedName()] = dataType;
        }
        return JSON.stringify(result, null, null)
                .replace(/\"String\"/g, "String")
                .replace(/\"\[String\]\"/g, "[String]")
                .replace(/\"Date\"/g, "Date")
                .replace(/\"Boolean\"/g, "Boolean")
                .replace(/\"Number\"/g, "Number");

        //* Functions

        /**
         * @see https://mongoosejs.com/docs/schematypes.html
         * @param {string} dataType
         * @returns {string}
         */
        function correctForMongoose(dataType) {
            var INNER_DEBUG = true;
            if (DEBUG && INNER_DEBUG) log("DEBUG", "correctForMongo() beginning: ");
            try {
                switch (dataType) {
                    case "Integer":
                        dataType = "Number";
                        break;

                    case "DocumentContent":
                    case "Text":
                        dataType = "String";
                        break;
                }

                //! Ideally, these would be Subdocuments...
                //* Storing the OID's as strings for now
                if (~dataType.indexOf("Entity")) {
                    dataType = "String"
                }

                //* ... and EntitySets as Arrays of OID Strings
                if (~dataType.indexOf("Set/") || ~dataType.indexOf("Enumeration/")) {
                    dataType = "[String]"
                }

                return dataType;

            } catch (e) {
                log("ERROR", "correctForMongo(): " + e.description);
                throw e;
            }
        }

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
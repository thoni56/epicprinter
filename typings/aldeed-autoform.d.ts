// Some rudimentary definitions for 'aldeed:autoform'

declare module 'meteor/aldeed:autoform' {

    export namespace AutoForm {
        function getFieldValue(fieldName:string, formId?:string);
    }

}
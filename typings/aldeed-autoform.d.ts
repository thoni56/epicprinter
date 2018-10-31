// Some rudimentary definitions for 'aldeed:autoform'

declare module 'meteor/aldeed:autoform' {

    export namespace AutoForm {
        function getFieldValue(fieldName:string, formId?:string) : any;
        function validateField(formId:string) : boolean;
        function resetForm(formId:string, templateInstance?:any) : void;
    }

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
// import SuiteInfo = jasmine.SuiteInfo
class CustomProcessor extends jasmine_spec_reporter_1.DisplayProcessor {
    displayJasmineStarted(log) {
        return `${log}`;
    }
}
// jasmine.getEnv().clearReporters()
// jasmine.getEnv().addReporter(
//   new SpecReporter({
//     spec: {
//       displayStacktrace: StacktraceOption.NONE
//     },
//     customProcessors: [CustomProcessor]
//   }) as CustomReporter
// )

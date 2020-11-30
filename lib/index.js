"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fullPath = process.env['GITHUB_WORKSPACE'];
            core_1.debug(`Workspace path is ${fullPath}`);
            core_1.debug(`Action local path is ${__dirname}`);
            // Get Inputs
            const jsonFilePath = core_1.getInput('json-file');
            if (jsonFilePath === undefined || jsonFilePath.length === 0) {
                core_1.error('A json file that has to be parsed must be provided.');
                throw Error('Unable to validate json file due to invalid input.');
            }
            core_1.info(`  json-file: ${jsonFilePath}`);
            const jsonFullFilePath = path_1.default.join(fullPath, jsonFilePath);
            const jsonString = fs_1.default.readFileSync(jsonFullFilePath, 'utf8');
            const jsonFileObject = JSON.parse(jsonString);
        }
        catch (ex) {
            core_1.setFailed(ex.message);
        }
    });
}
run();

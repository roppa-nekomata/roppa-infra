#!/usr/bin/env node
require('shelljs/global');
var shell = require('shelljs');
var path = require('path');
var sprintf = require('sprintf').sprintf;
var toolbox_js = require('toolbox-js');
var dateUtils = require('date-utils');
var argv = require('optimist').argv;

var dropAndCreate = true;
var backupBeforeDrop = false;

var dumpRootDir = path.join(__dirname, "dumps");

var mysqlPath = which('mysql').stdout;
var mysqldumpPath = which('mysqldump').stdout;

var backupRootDir = path.join(toolbox_js.getHomeDir(), '.backup');

var serverAddress = '127.0.0.1';

if (argv.host) {
    serverAddress = argv.host;
}

var target = "";
if (argv.target) {
    shell.mkdir('-p', path.join(dumpRootDir, argv.target));
    target = argv.target + "/";
}

if (argv.version) {
    target += argv.version + ".";
}

var servers = [
    {
        "name": "roppa-local",
        "hostname": serverAddress,
        "port": "3306",
        "username": "root",
        "password": "r00t!",
        "database": "roppa",
        "tables": {},
        "before": path.join(dumpRootDir, "roppa-local.roppa.0.before.sql"),
        "after": path.join(dumpRootDir, "roppa-local.roppa.9.after.sql")
    }
];


function verifyAndInitialize() {
    if (!shell.test('-e', dumpRootDir)) {
        shell.mkdir('-p', dumpRootDir);
    }

    if (!shell.test('-e', mysqlPath)) {
        console.error('mysql not found!');
        shell.exit(1);
    }

    if (!shell.test('-e', mysqldumpPath)) {
        console.error('mysqldump not found!');
        shell.exit(1);
    }
}

function getAfterFile(server) {
    if (!server || !server.after) {
        return [];
    }

    return server["after"];
}

function getBeforeFile(server) {
    if (!server || !server.before) {
        return [];
    }

    return server["before"];
}

function getSchemasFileName(server) {
    return sprintf("%s%s.%s.1.schemas.sql", target, server["name"], server["database"]);
}

function getSchemasFilePath(server) {
    return path.join(dumpRootDir, getSchemasFileName(server));
}

function getRecordsRequiredFileName(server) {
    return sprintf("%s%s.%s.2.records.required.sql", target, server["name"], server["database"]);
}

function getRecordsRequiredFilePath(server) {
    return path.join(dumpRootDir, getRecordsRequiredFileName(server));
}

function getRecordsOptionalFileName(server) {
    return sprintf("%s%s.%s.3.records.optional.sql", target, server["name"], server["database"]);
}

function getRecordsOptionalFilePath(server) {
    return path.join(dumpRootDir, getRecordsOptionalFileName(server));
}

function getTriggersFileName(server) {
    return sprintf("%s%s.%s.4.triggers.optional.sql", target, server["name"], server["database"]);
}

function getTriggersFilePath(server) {
    return path.join(dumpRootDir, getRecordsOptionalFileName(server));
}


function getBackupDir() {
    var date = new Date();

    var dateStr = date.toFormat('YYYY-MM-DD HH24:MI:SS');
    return path.join(backupRootDir, dateStr);
}

exports.dropAndCreate = dropAndCreate;
exports.backupBeforeDrop = backupBeforeDrop;
exports.servers = servers;
exports.dumpRootDir = dumpRootDir;
exports.mysqlPath = mysqlPath;
exports.mysqldumpPath = mysqldumpPath;

exports.backupRootDir = backupRootDir;

exports.verifyAndInitialize = verifyAndInitialize;

exports.getAfterFile = getAfterFile;
exports.getBeforeFile = getBeforeFile;
exports.getSchemasFilePath = getSchemasFilePath;
exports.getRecordsRequiredFilePath = getRecordsRequiredFilePath;
exports.getRecordsOptionalFilePath = getRecordsOptionalFilePath;
exports.getSchemasFileName = getSchemasFileName;
exports.getRecordsRequiredFileName = getRecordsRequiredFileName;
exports.getRecordsOptionalFileName = getRecordsOptionalFileName;
exports.getTriggersFilePath = getTriggersFilePath;
exports.getTriggersFileName = getTriggersFileName;

exports.getBackupDir = getBackupDir;

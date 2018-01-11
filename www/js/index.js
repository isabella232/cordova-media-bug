/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log("Starting Tests");
        this.testMedia();
        console.log("Ending Tests");
        setTimeout(function () {
            if(app.hasErrors) {
                console.log("FAILURE: Errors occurred during the tests");
            } else {
                console.log("SUCCESS: No errors during the tests")
            }
        }, 1000);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    hasErrors : false,

    errorsEncountered :function () {
        this.hasErrors = true;
    },

    testMedia : function() {
        var mediaFile = 'media_file' + new Date().getTime();
        console.log("Create new media file "+mediaFile);
        var my_media = new Media(mediaFile,
            function (e) {
                console.log('Media Success', e);
            },
            function (e) {
                if(e && e.hasOwnProperty('code') && e.code === 0) {
                    console.log("Media Expected Error", e);
                } else {
                    console.log('Media Unexpected Error', e);
                    app.errorsEncountered();
                }
            }
        );
        console.log("Starting a recorder");
        my_media.startRecord();
        console.log("Stopping a recorder");
        my_media.stopRecord();
        console.log("Playing Back recording");
        my_media.play();
        console.log("Stopping playback");
        my_media.stop();
    }


};

app.initialize();
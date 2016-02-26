//This is where a scheduled meeting is re-queued by removing the date
// removes previously assigned meeting date from the selected speech, and puts speech back in queue to be assigned a meeting date

router.post('/', function(request, response){

    var resetSpeech = "UPDATE speeches\
                SET speech_date = NULL, \
                WHERE speech_title = $1";

    pg.connect(connectionString, function(error, client, done) {
        if(err) {
            done();
            console.log(error);
            return response.status(500).json({ success: false, data: err});
        }

        client.query(resetSpeech, [meetingData.speech_1]);
        client.query(resetSpeech, [meetingData.speech_2]);
        client.query(resetSpeech, [meetingData.speech_3]);
    })
});
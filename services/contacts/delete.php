<?php
require('../service.php');
$file = "../../data/$ward/contacts.json";
$contact = $data;
// filter the data.
$contact->id = intval($contact->id);

// add/override that object in the json file.
echo del($file, 'contacts', $contact);
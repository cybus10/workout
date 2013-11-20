<?php
require('../service.php');
$file = "../../data/$ward/contacts.json";
$contacts = json_decode(file_get_contents($file))->contacts;
if ($data) {
    $contact = $data;
    // filter the data.
    $contact->id = intval($contact->id);
    // add required properties.
    if (!isset($contact->phone)) { $contact->phone = ""; }
    if (!isset($contact->permissionGranted)) { $contact->permissionGranted = false; }
    if (!isset($contact->skills)) { $contact->skills = new stdClass(); }
    if (!isset($contact->equipment)) { $contact->equipment = new stdClass(); }
    // add/override that object in the json file.
    $contacts = updateItem($contacts, $contact);
}
echo updateFile($file, 'contacts', $contacts);

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $tripType = $_POST['tripType'];
    $cabType = $_POST['cabType'];
    $Passengers = $_POST['Passengers'];
    $pickup = $_POST['pickup'];
    $drop = $_POST['destination'];
    $date = $_POST['departureDate']; // Corrected field name
    $time = $_POST['departureTime']; // Corrected field name
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // Check if it's a round trip or rental
    if ($trip_type == "Round" || $trip_type == "Rental") {
        $dateend = $_POST['returnDate1']; // Corrected field name for return date
        $timeend = $_POST['returnTime']; // Corrected field name for return time
    }

    // Compose email content
   // $to_email = "sandeshnanoti12@gmail.com";
  $to_email = "sandeshnanoti12@gmail.com";
    $subject = "Cabs Booking Enquiry";

    $message = "<html><body>";
    $message .= "<h2>Trip Booking Enquiry</h2>";
    $message .= "<p><strong>Trip Type:</strong> " . $tripType . "</p>";
    $message .= "<p><strong>Cab Type:</strong> " . $cabType. "</p>";
    $message .= "<p><strong>Passengers:</strong> " . $Passengers . "</p>";
    $message .= "<p><strong>Name:</strong> " . $name . "</p>";
    $message .= "<p><strong>Email:</strong> " . $email . "</p>";
    $message .= "<p><strong>Phone Number:</strong> " . $phone . "</p>";
    $message .= "<p><strong>From:</strong> " . $pickup . "</p>";
    $message .= "<p><strong>To:</strong> " . $drop . "</p>";
    $message .= "<p><strong>Start Date:</strong> " . $date . "</p>";
    $message .= "<p><strong>Start Timing:</strong> " . $time . "</p>";

    if ($trip_type == "Round" || $trip_type == "Rental") {
        $message .= "<p><strong>Return Date:</strong> " . $dateend . "</p>";
        $message .= "<p><strong>Return Timing:</strong> " . $timeend . "</p>";
    }

    $message .= "</body></html>";

    // Set headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: info@cobaztech.com";

    // Send the email
    if (mail($to_email, $subject, $message, $headers)) {
        echo '<script type="text/javascript">
        alert("Your Booking request has been successfully placed!, We will contact You shortly.");
        window.location.href = "index.html";
        </script>';
    } else {
        header("Location: index.html");
        exit;
    }
}

?>

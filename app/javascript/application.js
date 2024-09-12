// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "bootstrap";
import "../channels/chat_room_channel"
import "controllers/chat_controller";



import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";
import { Turbo } from "@hotwired/turbo-rails";
import { createConsumer } from "@rails/actioncable";

const application = Application.start();
const context = require.context("../controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

// Initialize ActionCable consumer
const consumer = createConsumer("/cable");

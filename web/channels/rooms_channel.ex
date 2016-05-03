defmodule SketchGuess.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("rooms:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in(command, body, socket) do
    broadcast! socket, command, body
    {:noreply, socket}
  end

  def handle_out(command, payload, socket) do
    push socket, command, payload
    {:noreply, socket}
  end

end

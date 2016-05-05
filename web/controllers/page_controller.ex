defmodule SketchGuess.PageController do
  use SketchGuess.Web, :controller

  def index(conn, _params) do
    room_id = :erlang.now |> Tuple.to_list |> Enum.map(&Integer.to_string/1) |> Enum.reduce("", &<>/2)
    render conn, "index.html", room_url: room_id
  end
end

defmodule SketchGuess.PageController do
  use SketchGuess.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

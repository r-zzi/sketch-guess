ExUnit.start

Mix.Task.run "ecto.create", ~w(-r SketchGuess.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r SketchGuess.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(SketchGuess.Repo)


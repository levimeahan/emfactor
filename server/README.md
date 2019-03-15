Handles API requests from the client, fetching/persisting
entities to the database, serving files, and authentication. To simplify codebase and improve flexibility as well as reduce
duplication, non-critical logic should generally be kept on the client and not here.
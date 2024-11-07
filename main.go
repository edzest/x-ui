package main

import (
	"context"
	"embed"
	"io/fs"
	"log"
	"os"
	"os/signal"
	"syscall"
)

//go:embed ui/build/*
var content embed.FS

func main() {
	subFS, err := fs.Sub(content, "ui/build")
	if err != nil {
		log.Fatal("Failed to create sub filesystem")
		os.Exit(1)
	}

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	log.Println("Starting the server")
	app := initApp(subFS)

	if err := app.Start(ctx); err != nil {
		log.Fatal("Error starting http server")
		os.Exit(1)
	}

	<-ctx.Done()
	log.Println("Shutting down the server")
}

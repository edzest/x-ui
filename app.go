package main

import (
	"context"
	"io/fs"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type App struct {
	srv *echo.Echo
}

func initApp(static fs.FS) *App {
	e := echo.New()
	e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:       "/",
		Index:      "index.html",
		HTML5:      true,
		Filesystem: http.FS(static),
	}))

	return &App{
		srv: e,
	}
}

func (a *App) Start(ctx context.Context) error {
	go func() {
		if err := a.srv.Start(":8080"); err != http.ErrServerClosed {
			a.srv.Logger.Fatalf("shutting down the server %v", err)
		}
	}()

	<-ctx.Done()
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := a.srv.Shutdown(shutdownCtx); err != nil {
		a.srv.Logger.Fatalf("Error shutting down the server: %v", err)
	}

	return nil
}

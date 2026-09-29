package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	//Serve already built frontend
	fs := http.FileServer(http.Dir("../OCR-frontend/dist"))
	http.Handle("/", fs)
	//Start HTTP server in a goroutine
	s := http.Server{Addr: ":8080"}
	go func() {
		logger.Info("Server listening on http://:8080")
		err := s.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			logger.Error("HTTP server error", "error", err)
		}
	}()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	<-sigChan

	logger.Info("Shutdown signal received")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
	defer cancel()
	err := s.Shutdown(ctx)
	if err != nil {
		logger.Info("Graceful server shutdown failed with", "error", err)
	} else {
		logger.Info("Graceful server sutdown succeeded")
	}
}

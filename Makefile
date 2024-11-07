# Makefile

# Variables
UI_DIR=ui
GO_APP_DIR=.
UI_BUILD_DIR=$(UI_DIR)/build

# Targets
.PHONY: all ui go clean

all: clean ui server start

ui:
	@echo "Building UI..."
	cd $(UI_DIR) && npm install && npm run build

server:
	@echo "Building Server..."
	cd $(GO_APP_DIR) && go build -o bin/app

clean:
	@echo "Cleaning up..."
	rm -rf $(UI_BUILD_DIR)
	rm -f bin/app

start:
	@echo "Starting application..."
	./bin/app
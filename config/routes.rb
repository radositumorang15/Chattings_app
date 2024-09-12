Rails.application.routes.draw do
  # Health check route
  get 'up' => 'rails/health#show', as: :rails_health_check

  # PWA routes
  get 'service-worker' => 'rails/pwa#service_worker', as: :pwa_service_worker
  get 'manifest' => 'rails/pwa#manifest', as: :pwa_manifest

  # Root route
  root 'chat_rooms#index'

  # Resources
  resources :chat_rooms, only: [:index, :show, :create, :destroy] do
    resources :messages, only: [:create]
  end
end

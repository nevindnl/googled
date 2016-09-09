class Api::ImagesController < ApplicationController
  def index
    @images = Image.all.take(20)
  end

  def favorites
    @images = current_user.images
  end

  def collection
    @collection = Collection.find_by_id(params[:id])
    @images = @collection.images
  end

  def search_collection
    @images = [];
    params[:images].each do |image|
      image = Image.new(image.last.permit(:title, :description, :url, :thumbUrl))
      image.save
      Favorite.create(user_id: current_user.id, image_id: image.id)
      @images.push(image)
    end
    render json: @images.map(&:id)
  end

  def show
    @image = Image.find_by_id(params[:id])
  end

  def favorite
    @image = Image.find_by_id(params[:id])
    if current_user.images.include?(@image)
      @favorite = current_user.favorites.find{|favorite| favorite.image_id == @image.id}
      @favorite.destroy
    else
      Favorite.create(user_id: current_user.id, image_id: @image.id)
    end

    render json: {}
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      Favorite.create(image_id: @image.id, user_id: current_user.id)
      render 'api/images/show'
    else
      render json: @image.errors.full_messages
    end
  end

  private

  def image_params
    params.require(:image).permit(:title, :description, :url, :thumbUrl)
  end
end

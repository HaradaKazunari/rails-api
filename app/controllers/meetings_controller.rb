class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show, :update, :destroy]

  # GET /meetings
  def index

    if where_params[:room_id].present?
      @meetings = Meeting.where(room_id: where_params[:room_id])
    else
      @meetings = Meeting.all
    end

    if where_params[:start_at].present?
      @meetings = @meeting.where(start_at: where_params[:start_at]...)
    else
      current_time = Time.zone.now
      rounded_time = current_time.change(hour: 0, min: 0, sec: 0)
      @meetings = @meetings.where(start_at: rounded_time...)
    end

    if where_params[:end_at].present?
      @meetings = @meeting.where(start_at: ...where_params[:start_at])
    end

    render json: @meetings
  end

  # GET /meetings/1
  def show
    render json: @meeting
  end

  # POST /meetings
  def create
    @meeting = Meeting.new(meeting_params)
    is_not_exists = Meeting.where(
      "(start_at >= ? AND start_at < ?) OR (end_at > ? AND end_at <= ?)",
      meeting_params[:start_at], meeting_params[:end_at], meeting_params[:start_at], meeting_params[:end_at]
    ).where(room_id: meeting_params[:room_id]).empty?

    if is_not_exists && @meeting.save
      render json: @meeting, status: :created, location: @meeting
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meetings/1
  def update
    if @meeting.update(meeting_params)
      render json: @meeting
    else
      render json: @meeting.errors, status: :unprocessable_entity
    end
  end

  # DELETE /meetings/1
  def destroy
    @meeting.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def meeting_params
      params.require(:meeting).permit(:user_id, :room_id, :start_at, :end_at)
    end

    def where_params
      params.permit(:room_id, :start_at, :end_at)
    end
end

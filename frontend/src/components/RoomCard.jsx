export default function RoomCard({ room, nights, onBook }) {
  return (
    <div className="card room-card h-100">
      {room.image && <img src={room.image} alt={room.name} />}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="mb-1">{room.name}</h5>
          <span className="badge bg-light text-dark border">{room.type}</span>
        </div>
        <p className="text-muted small mb-2">Sleeps {room.capacity}</p>
        <p className="mb-0">{room.description}</p>
      </div>
      <div className="card-footer bg-white border-0 pb-3">
        <div className="d-flex justify-content-between align-items-end mb-2">
          <div className="price">₹{room.price} <small>/ night</small></div>
          {nights > 0 && (
            <div className="text-end small text-muted">
              {nights} night{nights > 1 ? 's' : ''}<br />
              <strong className="text-dark">₹{nights * room.price} total</strong>
            </div>
          )}
        </div>
        <button className="btn btn-gold w-100" onClick={() => onBook(room._id)}>Book now</button>
      </div>
    </div>
  );
}

function index(req, res) {
  res.status(200).send({
    message: "Index",
  });
}

export default {
  index,
};

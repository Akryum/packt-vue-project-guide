<script>
export default {
  functional: true,

  render (h, { props }) {
    return <div class="details">
      <div class="name"><i class="material-icons">place</i> {props.name}</div>
      <div class="address"> {props.address}</div>
    </div>
  },
}
</script>

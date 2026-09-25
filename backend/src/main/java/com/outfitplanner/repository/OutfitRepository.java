@Repository
public interface OutfitRepository
        extends JpaRepository<Outfit, Long> {

    List<Outfit> findByUserId(Long userId);
}